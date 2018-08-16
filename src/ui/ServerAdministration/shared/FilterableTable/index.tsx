////////////////////////////////////////////////////////////////////////////
//
// Copyright 2018 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import * as classnames from 'classnames';
import * as React from 'react';
import {
  AutoSizer,
  ColumnProps,
  Dimensions as IAutoSizerDimensions,
  Table,
} from 'react-virtualized';
import { QuerySearch } from '../../../reusable/QuerySearch';
import './FilterableTable.scss';

export const FilterableTableWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="Table">{children}</div>;

export interface IFilterableTableProps<E extends any> {
  children: Array<React.ReactElement<ColumnProps>>;
  elements: Realm.Results<E>;
  isElementsEqual: (a: E, b: E) => boolean;
  onElementClick: (e: React.MouseEvent<HTMLElement>, element: E) => void;
  onElementDoubleClick?: (element: E) => void;
  onElementsDeselection: () => void;
  onSearchStringChange: (searchString: string) => void;
  searchPlaceholder: string;
  searchString: string;
  selectedElements: E[];
}

export const FilterableTable = <E extends any>({
  children,
  elements,
  isElementsEqual,
  onElementClick,
  onElementDoubleClick,
  onElementsDeselection,
  onSearchStringChange,
  searchPlaceholder,
  searchString,
  selectedElements,
}: IFilterableTableProps<E>) => (
  <div className="Table__content">
    <div className="Table__topbar">
      <QuerySearch
        query={searchString}
        onQueryChange={onSearchStringChange}
        placeholder={searchPlaceholder}
      />
    </div>
    <div className="Table__table" onClick={() => onElementsDeselection()}>
      <AutoSizer>
        {({ width, height }: IAutoSizerDimensions) => (
          <Table
            width={width}
            height={height}
            rowHeight={30}
            headerHeight={30}
            rowClassName={({ index }) => {
              if (index >= 0) {
                const element = elements[index];
                // When https://github.com/realm/realm-js/issues/19 we could use a `Set`
                const isSelected = !!selectedElements.find(e =>
                  isElementsEqual(e, element),
                );
                return classnames('Table__row', {
                  'Table__row--selected': isSelected,
                });
              } else {
                return 'Table__row';
              }
            }}
            rowCount={elements.length}
            rowGetter={({ index }) => elements[index]}
            onRowClick={({ event, index }) => {
              const element = elements[index];
              // TODO: Remove the cast once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/28169 gets merged.
              onElementClick(event as React.MouseEvent<any>, element);
              event.preventDefault();
              event.stopPropagation();
            }}
            onRowDoubleClick={({ event, index }) => {
              const element = elements[index];
              if (onElementDoubleClick) {
                onElementDoubleClick(element);
              }
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {children}
          </Table>
        )}
      </AutoSizer>
    </div>
  </div>
);
