import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box } from '@mui/material';

// third-party
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// project imports
import Columns from './Columns';
import AddColumn from './AddColumn';
import ItemDetails from './ItemDetails';
import MainCard from '@/ui-component/cards/MainCard';
import {
  UPDATE_COLUMN_ORDER,
  UPDATE_COLUMN_ITEM_ORDER,
} from '@/store/action/actions';

const getDragWrapper = (isDraggingOver) => ({
  p: 1,
  bgcolor: isDraggingOver ? 'primary.200' : 'transparent',
  display: 'flex',
  overflow: 'auto',
});

// ==============================|| KANBAN - BOARD ||============================== //

const Board = () => {
  const dispatch = useDispatch();

  const kanban = useSelector((state) => state.kanban);
  const { columns, columnsOrder } = kanban;

  // handle drag & drop
  const onDragEnd = (result) => {
    let newColumn;
    const { source, destination, draggableId, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newColumnsOrder = Array.from(columnsOrder);

      newColumnsOrder.splice(source.index, 1); // remove dragged column
      newColumnsOrder.splice(destination?.index, 0, draggableId); // set column new position

      dispatch({
        type: UPDATE_COLUMN_ORDER,
        payload: { columnsOrder: newColumnsOrder },
      });
      return;
    }

    // find dragged item's column
    const sourceColumn = columns.filter(
      (item) => item.id === source.droppableId
    )[0];

    // find dropped item's column
    const destinationColumn = columns.filter(
      (item) => item.id === destination.droppableId
    )[0];

    // if - moving items in the same list
    // else - moving items from one list to another
    if (sourceColumn === destinationColumn) {
      const newItemIds = Array.from(sourceColumn.itemIds);

      // remove the id of dragged item from its original position
      newItemIds.splice(source.index, 1);

      // insert the id of dragged item to the new position
      newItemIds.splice(destination.index, 0, draggableId);

      // updated column
      const newSourceColumn = {
        ...sourceColumn,
        itemIds: newItemIds,
      };

      newColumn = columns.map((column) => {
        if (column.id === newSourceColumn.id) {
          return newSourceColumn;
        }
        return column;
      });
    } else {
      const newSourceItemIds = Array.from(sourceColumn.itemIds);

      // remove the id of dragged item from its original column
      newSourceItemIds.splice(source.index, 1);

      // updated dragged items's column
      const newSourceColumn = {
        ...sourceColumn,
        itemIds: newSourceItemIds,
      };

      const newDestinationItemIds = Array.from(destinationColumn.itemIds);

      // insert the id of dragged item to the new position in dropped column
      newDestinationItemIds.splice(destination.index, 0, draggableId);

      // updated dropped item's column
      const newDestinationColumn = {
        ...destinationColumn,
        itemIds: newDestinationItemIds,
      };

      newColumn = columns.map((column) => {
        if (column.id === newSourceColumn.id) {
          return newSourceColumn;
        }
        if (column.id === newDestinationColumn.id) {
          return newDestinationColumn;
        }
        return column;
      });
    }

    dispatch({
      type: UPDATE_COLUMN_ITEM_ORDER,
      payload: {
        columns: newColumn,
      },
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='columns' direction='horizontal' type='column'>
          {(provided, snapshot) => (
            <MainCard
              border={false}
              ref={provided.innerRef}
              contentSX={getDragWrapper(snapshot.isDraggingOver)}
              {...provided.droppableProps}>
              {columnsOrder.map((columnId, index) => {
                const column = columns.filter(
                  (item) => item.id === columnId
                )[0];
                return <Columns key={columnId} column={column} index={index} />;
              })}
              {provided.placeholder}
              <AddColumn />
            </MainCard>
          )}
        </Droppable>
      </DragDropContext>
      <ItemDetails />
    </Box>
  );
};

export default Board;
