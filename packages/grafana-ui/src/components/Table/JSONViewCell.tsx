import React, { FC } from 'react';
import { css, cx } from 'emotion';
import { TableCellProps } from './types';
import { Tooltip } from '../Tooltip/Tooltip';
import { JSONFormatter } from '../JSONFormatter/JSONFormatter';
import { useTheme } from '../../themes';

export const JSONViewCell: FC<TableCellProps> = props => {
  const { field, cell, tableStyles } = props;

  if (!field.display) {
    return null;
  }

  const txt = css`
    cursor: pointer;
    font-family: monospace;
  `;

  const displayValue = JSON.stringify(cell.value);
  const content = <JSONTooltip value={cell.value} />;
  return (
    <div className={cx(txt, tableStyles.tableCell)}>
      <Tooltip placement="auto" content={content} theme={'info'}>
        <div className={tableStyles.overflow}>{displayValue}</div>
      </Tooltip>
    </div>
  );
};

interface PopupProps {
  value: any;
}

const JSONTooltip: FC<PopupProps> = props => {
  const theme = useTheme();
  const className = css`
    padding: ${theme.spacing.xs};
    background-color: ${theme.colors.bg1};
  `;
  return (
    <div className={className}>
      <div style={{ backgroundColor: '#fff' }}>
        <JSONFormatter json={props.value} open={4} />
      </div>
    </div>
  );
};
