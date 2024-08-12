// project imports
import Specification from './Specification';
import Accordion from 'ui-component/extended/Accordion';

// accordion data
const descriptionData = [
  {
    id: 'basic1',
    defaultExpand: true,
    title: 'Specification',
    content: <Specification />,
  },
];

// ==============================|| PRODUCT DETAILS - DESCRIPTION ||============================== //

const ProductDescription = () => <Accordion data={descriptionData} />;

export default ProductDescription;
