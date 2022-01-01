import {BelongsToGetAssociationMixin, Model, Optional} from 'sequelize';
import UserInstance from './user-interface';
import PlateInstance from './plate-interface';
export enum Status {
  pending='pending',
  enter='enter',
  exit='exit',
  done='done'
}

export const StatusNames = Object.keys(Status);

interface OrderAttributes {
  id: number;
  enterTime: Date ;
  exitTime?: Date;
  status: Status;
  tradeAmount?: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

/* eslint-disable */
export default interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes {
  getUser: BelongsToGetAssociationMixin<UserInstance>;
  getPlate: BelongsToGetAssociationMixin<PlateInstance>;
  user: UserInstance;
  plate: PlateInstance;
}
