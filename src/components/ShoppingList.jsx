import { useState, useContext, useRef } from 'react';
import { AppContext } from '../AppContext';

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, Checkbox,Box,Typography, styled,Button  } from '@mui/material';
import { EmptyShoppingList } from './EmptyShoppingList';

import { DeleteItemDialog, } from './DeleteItemDialog';
import { AddEditItemFormMu } from './AddEditItemDialog';
// import 


const ListContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    width: '60%',
    margin: '0 auto',
    marginTop: '20px',
    backgroundColor: 'white',
    color: '#87898c',
})

const StyledListTitle = styled(Typography)({
    fontSize: '18px',
    fontFamily: 'Nunito 18px SemiBold',
    lineHeight: '24px',
    color: '#000000',
    textAlign: 'left',
    // padding: '10px',
    
})

const StyledListItemPrimary = styled(Typography)({
    fontSize: '18px',
    color: '#000000',
    fontFamily: 'Nunito 18px SemiBold',
    lineHeight: '24px',
    textAlign: 'left',
})
const StyledListItemPrimaryStrike = styled(StyledListItemPrimary)({
    textDecoration: 'line-through',
    padding: '0',
})

const StyledListItemSecondaryStrike = styled(Typography)({
    textDecoration: 'line-through',
    padding: '0',
})



const StyledAddItemButton = styled(Button)({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1871e8',
    color: 'white',
    border: '1px solid #87898c',
    // width: '59px',
    // height: '20px',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center',
})

const StyledAddItemContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: '10px',
})


export function ShoppingList () {
    const { items, setItems } = useContext(AppContext);
    const [editIndex, setEditIndex] = useState(null);
    const [showAddEditItem, setShowAddEditItem] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);    
    const [deleteIndex, setDeleteIndex] = useState(null);
    
    const handleDeleteItem = (index) => {
        // const newItems = items.filter((item, i) => i !== index);
        setIsDeleteDialogOpen(true);
        setDeleteIndex(index)
        // setItems(newItems);
    }

    const handleEditItem = (index) => {
        setEditIndex(index);
        setShowAddEditItem(true);
    }

    const handleAddItem = (item) => {
        setEditIndex(null);
        setShowAddEditItem(true);
    }


    const handleCheckItem = (index) => {
        const newItems = [...items];
        newItems[index].purchased = !newItems[index].purchased;
        setItems(newItems);
    }

    const StyledListItem = styled(ListItem)({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '0.5px solid #D5DFE9',
        borderRadius: '4px',
        '&:hover': {
            background: 'rgba(213, 223, 233, 0.17)'
        },
        marginBottom: '10px'
    })

    return items.length > 0 ? (
        <>
        <ListContainer component={'div'}>
            <StyledAddItemContainer>
                <StyledListTitle variant='h5' >Your items </StyledListTitle>
                <StyledAddItemButton onClick={() =>handleAddItem()}>Add Item</StyledAddItemButton>
            </StyledAddItemContainer>
            <List>
                {items.map((item, index) => (
                    <StyledListItem key={index}>
                        <ListItemIcon>
                            <Checkbox
                                onChange={() =>handleCheckItem(index)}
                                edge="start"
                                checked={item.purchased}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText 
                            primary={
                            <StyledListItemPrimary>
                                {
                                    item.purchased ? <StyledListItemPrimaryStrike component='span'>{item.name}</StyledListItemPrimaryStrike> : item.name
                                }
                            </StyledListItemPrimary>
                            }
                            secondary={
                                item.purchased ? <StyledListItemSecondaryStrike component='span'>{item.description}</StyledListItemSecondaryStrike> : item.description
                            }
                            />
                        <ListItemSecondaryAction >
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditItem(index)} style={{paddingRight: '20px'}}>
                                <div className="material-icons">edit</div>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(index)}>
                                <div className='material-icons'>delete</div>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </StyledListItem>
                ))}
            </List>
                <DeleteItemDialog
                    openDeleteModal={setIsDeleteDialogOpen}
                    isDialogOpen={isDeleteDialogOpen}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                    setItems={setItems}
                    deleteIndex={deleteIndex}
                />
                <AddEditItemFormMu
                    showAddItemModal={showAddEditItem}
                    setShowAddItemModal={setShowAddEditItem}
                    editIndex={editIndex}
                    setEditIndex={setEditIndex}
                />
            </ListContainer>
            </>
        ) : <EmptyShoppingList />
}