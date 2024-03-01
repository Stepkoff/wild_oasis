import {Heading} from "../ui/Heading.js";
import {Row} from "../ui/Row";
import {CabinTable} from "@/features/cabins";
import {AddCabin} from "@/features/cabins";
export const CabinsPage = () => {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row>
        <CabinTable/>
        <AddCabin/>
      </Row>
    </>
  );
}
