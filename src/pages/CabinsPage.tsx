import {Heading} from "../ui/Heading.js";
import {Row} from "../ui/Row";
import {CabinTable} from "@/features/cabins";
import {Button} from "@/ui/Button.tsx";
import {useState} from "react";
import {CreateCabinForm} from "@/features/cabins";

export const CabinsPage = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row>
        <CabinTable/>
        <Button onClick={() => setShowForm(prev => !prev)}>Add new Cabin</Button>
        {showForm && <CreateCabinForm/>}
      </Row>
    </>
  );
}
