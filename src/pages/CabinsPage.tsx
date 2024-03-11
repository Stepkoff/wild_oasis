import {Heading} from "../ui/Heading.js";
import {Row} from "../ui/Row";
import {CabinTable} from "@/features/cabins";
import {AddCabin} from "@/features/cabins";
import {CabinTableOperations} from "@/features/cabins/CabinTableOperations.tsx";
export const CabinsPage = () => {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>
      <Row>
        <CabinTable/>
        <AddCabin/>
      </Row>
    </>
  );
}
