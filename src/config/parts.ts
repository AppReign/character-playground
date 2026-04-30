import { ConfigPart } from "../interfaces/Config";
import partsBase from "./partsBase";
import allEquipmentItems from "./allEquipmentItems";

const configParts: ConfigPart[] = [...partsBase, ...allEquipmentItems];

export default configParts;
