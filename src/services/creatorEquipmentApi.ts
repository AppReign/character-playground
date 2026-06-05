export type ApiCharacterDisplayImageRow = {
  filename: string;
  layer: string;
};

export type ApiCharacterDisplayMeta = {
  tuckIntoPants?: boolean;
  tuckBoots?: boolean;
};

/** Game API shape (`male` / `female` buckets). */
export type ApiCharacterDisplay = {
  meta?: ApiCharacterDisplayMeta;
  male?: Record<string, ApiCharacterDisplayImageRow[]>;
  female?: Record<string, ApiCharacterDisplayImageRow[]>;
};
