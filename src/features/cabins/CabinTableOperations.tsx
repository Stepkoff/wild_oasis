import {TableOperations} from "@/ui/TableOperations.tsx";
import {Filter} from "@/ui/Filter.tsx";

export const CabinTableOperationsValues = {
  'all': 'All',
  'withDiscount': 'With discount',
  'noDiscount':'No discount',
}

// const a = CabinTableOperationsValues[CabinTableOperationsValues.ALL]
// console.log(a)

// type keys = keyof typeof CabinTableOperationsValues;
// export type CabinTableOperationsValuesType = typeof CabinTableOperationsValues[keys];

// const optionsArr: Array<string> = Object.keys(CabinTableOperationsValues)

export const CabinTableOperations = () => {

  return (
    <TableOperations>
      <Filter filterField={'discount'} options={CabinTableOperationsValues}  />
    </TableOperations>
  )
}