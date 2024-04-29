import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  // useEffect(() => {
  //   getCabins().then((cabins) => {
  //     console.log(cabins);
  //   });
  // }, []);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Fliter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
