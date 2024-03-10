import {useQuery} from "@tanstack/react-query";
import {getCabins} from "@/services/apiCabins.ts";
import {Cabin} from "@/app/Types.ts";
import {Spinner} from "@/ui/Spinner.tsx";
import {CabinRow} from "@/features/cabins/CabinRow.tsx";
import {Table} from "@/ui/Table.tsx";
import {Menus} from "@/ui/Menus.tsx";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export const CabinTable = () => {
  const {data: cabins, isLoading} = useQuery<Cabin[]>({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  if(isLoading) return (
    <Spinner/>
  )

  return (
    <Menus>
      <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins} render={(cabin) => (<CabinRow key={cabin.id} cabin={cabin} />)} />
      </Table>
    </Menus>
  )
}