/* eslint-disable */
import { Rpc } from "../helpers";
export const protobufPackage = "auranw.aura.aura";
/** Query defines the gRPC querier service. */

export interface Query {}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
}
