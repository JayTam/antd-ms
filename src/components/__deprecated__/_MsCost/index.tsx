import CostPlay from './components/CostPlay';
import MsCostIndex from './components/index';
import Product from './components/Product';
import ProductItem from './components/ProductItem';
import { useCost } from './components/useCost';

type MsCostIndexType = typeof MsCostIndex;

type CompoundedComponent = MsCostIndexType & {
  Product: typeof Product;
  ProductItem: typeof ProductItem;
  CostPlay: typeof CostPlay;
  useCost: typeof useCost;
};

const MsCost = MsCostIndex as CompoundedComponent;
MsCost.Product = Product;
MsCost.ProductItem = ProductItem;
MsCost.CostPlay = CostPlay;
MsCost.useCost = useCost;

export default MsCost;
