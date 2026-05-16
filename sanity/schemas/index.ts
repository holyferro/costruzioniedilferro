import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { realizzazione } from "./realizzazione";
import { newsArticle } from "./newsArticle";

export const schemaTypes: SchemaTypeDefinition[] = [blockContent, realizzazione, newsArticle];
