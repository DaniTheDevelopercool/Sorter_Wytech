import { Box, MenuItem, Select } from "@mui/material";
import {
  useGetLabelsQuery,
  useGetLocationsQuery,
  useLinkLabelWithLocationMutation,
} from "../../services/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Label } from "../../types/Labels";
import Loading from "../../Components/Common/Loading";
import { useState } from "react";

export default function Labels() {
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetLabelsQuery();
  const { data: locationsData, refetch: refetchLocations } =
    useGetLocationsQuery();
  const [linkLabel] = useLinkLabelWithLocationMutation();
  const onEditLabel = async (labelMAC: string, locationID: number | string) => {
    setLoading(true);
    const response = await linkLabel({ labelMAC, locationID });
    console.log("Response", response);
    await refetch();
    await refetchLocations();
    setLoading(false);
  };

  const columns: GridColDef<Label>[] = [
    { field: "ID", headerName: "ID", width: 90 },
    {
      field: "MAC",
      headerName: "MAC",
      width: 150,
    },
    {
      field: "Ubicacion",
      width: 200,
      editable: false,
      renderCell(params) {
        const { row } = params;
        return (
          <Select
            value={row.ID}
            onChange={(event) => onEditLabel(row.MAC, event.target.value)}
          >
            {locationsData?.map((location) => (
              <MenuItem value={location.id}>{location.name}</MenuItem>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <Box flex={1} flexDirection="column">
      {(loading || !data) && <Loading />}
      {data && (
        <Box display="flex" flexDirection="row" gap={2} p={2}>
          <DataGrid rows={data} columns={columns} getRowId={(row) => row.ID} />
        </Box>
      )}
    </Box>
  );
}
