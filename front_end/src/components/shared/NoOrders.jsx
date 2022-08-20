import { Table, TableBody, TableRow, TableCell } from "@mui/material";

export const NoOrder = () => {
  return (
    <Table>
      <TableBody>
        <TableRow sx={{ backgroundColor: "#fff", minWidth: "1000px" }}>
          <TableCell sx={{ fontWeight: 600, textAlign: "center", padding: 3 }}>
            No Order
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
