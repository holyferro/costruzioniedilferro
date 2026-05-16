import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { project } from "./project";
import { newsArticle } from "./newsArticle";
import { teamMember } from "./teamMember";

export const schemaTypes: SchemaTypeDefinition[] = [blockContent, project, newsArticle, teamMember];
