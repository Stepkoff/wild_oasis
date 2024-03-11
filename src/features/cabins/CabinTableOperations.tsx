import {TableOperations} from "@/ui/TableOperations.tsx";
import {Filter} from "@/ui/Filter.tsx";
import {CabinTableOperationsValues} from "@/features/cabins/cabinConsts.ts";

export const CabinTableOperations = () => {

  return (
    <TableOperations>
      <Filter filterField={'discount'} options={CabinTableOperationsValues}  />
    </TableOperations>
  )
}