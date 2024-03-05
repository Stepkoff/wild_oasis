import styled from "styled-components";
import {Cabin as CabinType} from "@/app/Types.ts";
import {formatCurrency} from "@/utils/helpers.ts";
import 'react-toastify/dist/ReactToastify.css';
import {EditCabinForm} from "@/features/cabins/EditCabinForm.tsx";
import {useDeleteCabin} from "@/features/cabins/useDeleteCabin.tsx";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import {useDuplicateCabin} from "@/features/cabins/useDuplicateCabin.tsx";
import {Modal} from "@/ui/Modal.tsx";
import {ConfirmDelete} from "@/ui/ConfirmDelete.tsx";

const TableRow = styled.div`
   display: grid;
   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
   column-gap: 2.4rem;
   align-items: center;
   padding: 1.4rem 2.4rem;
  
   &:not(:last-child) {
     border-bottom: 1px solid var(--color-grey-100);
   }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", sans-serif;
`;

const Price = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: CabinType
}

export const CabinRow = ({cabin}:CabinRowProps) => {
  const {isPending, deleteCabin} = useDeleteCabin();

  const {isPending: isCreating, duplicate} = useDuplicateCabin();
  const handleDuplicateCabin = () => {
    duplicate({
      description: cabin.description,
      discount: cabin.discount,
      regularPrice: cabin.regularPrice,
      maxCapacity: cabin.maxCapacity,
      cabinName: cabin.cabinName,
      imageUrl: cabin.imageUrl,
    })
  }

  const handleDelete = () => deleteCabin({id: cabin.id, url: cabin.imageUrl, isCopy: cabin.isCopy})

  return (
    <>
      <TableRow role={'row'}>
        <Img src={cabin.imageUrl}/>
        <Cabin>{cabin.cabinName}</Cabin>
        <div>Fits up to {cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? <Discount>{formatCurrency(cabin.discount)}</Discount> : <span>&mdash;</span>}
        <div>
          <button disabled={isPending || isCreating} onClick={handleDuplicateCabin}><HiSquare2Stack/></button>
          <Modal>
            <Modal.Open openWindowName={'cabin-form'}>
              <button disabled={isPending || isCreating}><HiPencil/></button>
            </Modal.Open>
            <Modal.Window openWindowName={'cabin-form'}>
              <EditCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open openWindowName={'cabin-form'}>
              <button disabled={isPending || isCreating}><HiTrash/></button>
            </Modal.Open>
            <Modal.Window openWindowName={'cabin-form'}>
              <ConfirmDelete resourceName={'cabins'} onConfirm={handleDelete} disabled={isPending} />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  )
}
