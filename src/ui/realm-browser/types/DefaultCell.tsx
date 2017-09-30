import * as classnames from 'classnames';
import * as React from 'react';
import * as Realm from 'realm';
import * as util from 'util';

export const DefaultCell = ({
  property,
  value,
  onContextMenu,
}: {
  property: Realm.ObjectSchemaProperty;
  value: any;
  onContextMenu: (e: React.SyntheticEvent<any>) => void;
}) => (
  <div
    onContextMenu={onContextMenu}
    className={classnames(
      'form-control',
      'form-control-sm',
      'RealmBrowser__Content__Input',
      'RealmBrowser__Content__Input--disabled',
    )}
  >
    {util.inspect(value)}
  </div>
);