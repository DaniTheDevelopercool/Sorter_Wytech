import { Box, MenuItem, Select, Tooltip } from "@mui/material";
import {
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useGetLabelsQuery,
  useGetLocationsQuery,
  useLinkLabelWithLocationMutation,
} from "../../services/api";
import { useEffect, useState } from "react";
import Loading from "../../Components/Common/Loading";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridSlotProps,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import { Location } from "../../types/Locations";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    nextRow: number;
    setRows: (newRows: (oldRows: Location[]) => Location[]) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel, nextRow } = props;

  const handleClick = () => {
    setRows((oldRows) => [
      ...oldRows,
      {
        id: nextRow,
        name: "",
        orderID: "",
        productEAN: "",
        productQuantity: 0,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [nextRow]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <Toolbar>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function Locations() {
  const [loading, setLoading] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data, refetch } = useGetLocationsQuery();
  const [rows, setRows] = useState<Location[]>(data ?? []);
  const { data: labelsData, refetch: refetchLabels } = useGetLabelsQuery();
  const [linkLabel] = useLinkLabelWithLocationMutation();
  const [createLocation] = useCreateLocationMutation();
  const [deleteLocation] = useDeleteLocationMutation();

  const reloadModule = async () => {
    setLoading(true);
    await refetch();
    await refetchLabels();
    setLoading(false);
  };

  const onEditLabel = async (labelMAC: string, locationID: number | string) => {
    await linkLabel({ labelMAC, locationID });
    await reloadModule();
  };

  const saveLocation = async (newLocation: Location) => {
    await createLocation(newLocation);
    await reloadModule();
  };

  const removeLocation = async (locationID: number) => {
    await deleteLocation(locationID);
    await reloadModule();
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newRow: Location, oldRow: Location) => {
    const currentRowIndex = data?.findIndex((lc) => lc.id === newRow.id);
    if ((currentRowIndex ?? -1) < 0) {
      saveLocation(newRow);
    } else {
      if(newRow.id!==oldRow.id){
        // Actualizar ID
      }
      if(newRow.name!==oldRow.name){
        // Actualizar name
      }
      if(newRow.orderID!==oldRow.orderID){
        // Actualizar orderID
      }
      if(newRow.productEAN!==oldRow.productEAN){
        // Actualizar productEAN
      }
      if(newRow.productQuantity!==oldRow.productQuantity){
        // Actualizar productQuantity
      }
    }
    return newRow;
  };

  const handleDeleteClick = (id: number) => () => {
    removeLocation(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef<Location>[] = [
    { field: "id", headerName: "ID", width: 90, editable: true },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "orderID",
      headerName: "Orden Asignada",
      width: 150,
      editable: true,
    },
    {
      field: "productEAN",
      headerName: "Producto enfocado",
      width: 150,
      editable: true,
    },
    {
      field: "productQuantity",
      headerName: "Cantidad enfocada",
      width: 150,
      editable: true,
    },
    {
      field: "Ubicacion",
      width: 200,
      editable: false,
      renderCell(params) {
        const { row } = params;
        return (
          <Select
            value={
              labelsData?.find((label) => label.ID === row.id.toString())?.MAC
            }
            onChange={(event) => onEditLabel(event.target.value, row.id)}
          >
            {labelsData?.map((label) => (
              <MenuItem value={label.MAC}>{label.MAC}</MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(Number(id))}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const nextRow = ([...rows]?.sort((a, b) => b.id - a.id)?.[0]?.id ?? 0) + 1;

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setRows(data);
    }
  }, [data]);

  return (
    <Box flex={1} flexDirection="column">
      {(loading || !data) && <Loading />}
      {data && (
        <Box display="flex" flexDirection="row" gap={2} p={2}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            onRowEditStop={handleRowEditStop}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel, nextRow },
            }}
            showToolbar
          />
        </Box>
      )}
    </Box>
  );
}
