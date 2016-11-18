import React from 'react';
import { pure, skinnable, props, t } from '../../utils';
import FlexView from 'react-flexview';
import { Cell as CellFDT } from 'fixed-data-table-2';

const { maybe, enums, union } = t;

const propsTypes = {
  data: t.Any,
  children: union([t.Function, t.ReactChildren]),
  backgroundColor: maybe(t.String),
  color: maybe(t.String),
  vAlignContent: maybe(enums.of(['top', 'center', 'bottom'])),
  hAlignContent: maybe(enums.of(['left', 'center', 'right'])),
  style: maybe(t.Object)
};

const template = ({
  data,
  children,
  backgroundColor,
  color,
  vAlignContent = 'center',
  hAlignContent = 'left',
  style
}) => {
  return (
    <CellFDT>
      <FlexView
        className='tablo-cell'
        style={{ backgroundColor, color, ...style }}
        vAlignContent={vAlignContent}
        hAlignContent={hAlignContent}
      >
        <FlexView className='content' vAlignContent='center'>
          {t.Function.is(children) ? children(data) : children}
        </FlexView>
      </FlexView>
    </CellFDT>
  );
};

@skinnable(template)
@pure
@props(propsTypes)
export default class Cell extends React.Component {}

export const defaultCell = <Cell>{dataCell => dataCell}</Cell>;