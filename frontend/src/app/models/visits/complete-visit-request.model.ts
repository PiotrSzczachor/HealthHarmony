import { DocumentDto } from "../documents/document-dto.model";

export interface CompleteVisitRequest {
    visitId: string,
    document: DocumentDto
}