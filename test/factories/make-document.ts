import { Document } from "src/domain/entities/value-object/document";

export const makeDocument = (override?: string): Document =>
  Document.create(override ?? "98708315167");
