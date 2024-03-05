import {Button} from "@/ui/Button.tsx";
import {CreateCabinForm} from "@/features/cabins/CreateCabinForm.tsx";
import {Modal} from "@/ui/Modal.tsx";

export const AddCabin = () => {

  return(
    <div>
      <Modal>
        <Modal.Open openWindowName={'cabin-form'}>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window openWindowName={'cabin-form'}>
          <CreateCabinForm/>
        </Modal.Window>
      </Modal>
    </div>
  )
}


// export const AddCabin = () => {
//   const [modalIsOpened, setModalIsOpened] = useState(false)
//
//   const handleClose = useCallback(() => {
//     setModalIsOpened(false)
//   }, [])
//
//   return (
//     <>
//       <Button onClick={() => setModalIsOpened(prev => !prev)}>Add new Cabin</Button>
//       {modalIsOpened && (
//         <Modal onClose={handleClose}>
//           <CreateCabinForm onClose={handleClose}/>
//         </Modal>
//         )
//       }
//     </>
//   )
// }