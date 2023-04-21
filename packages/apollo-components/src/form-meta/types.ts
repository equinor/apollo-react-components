export type FormMeta = {
  _isNew?: boolean;
  _editMode?: boolean;
  _hasRemoteChange?: boolean;
};

export type WithoutFormMeta<T extends FormMeta> = Omit<T, keyof FormMeta>;
