import { useAppDispatch } from '@/redux/hooks';
import { logout, checkUserLocalStorage } from '@/redux/slices/userSlice';
import { deleteProperty, updateProperty } from '@/redux/thunks/property';
import { UpdatePropertyFormData } from '@/models/interfaces/property';
import { refreshToken } from '@/redux/thunks/user';
import { checkBookingLocalStorage } from '@/redux/slices/bookingSlice';
import { checkPropertyLocalStorage } from '@/redux/slices/propertySlice';

function useStore() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const handleRefreshToken = () => {
    return dispatch(refreshToken()).unwrap();
  };

  const checkUserState = () => {
    dispatch(checkUserLocalStorage());
  };

  const checkPropertyState = () => {
    dispatch(checkPropertyLocalStorage());
  };

  const checkBookingState = () => {
    dispatch(checkBookingLocalStorage());
  };
  const handleDeleteProperty = async (id: string) => {
    return await dispatch(
      deleteProperty({ dispatch, propertyId: id })
    ).unwrap();
  };
  const handleUpdateProperty = async (
    data: UpdatePropertyFormData,
    id: string
  ) => {
    console.warn('Handle Update Property');
    return await dispatch(
      updateProperty({ data, propertyId: id, dispatch })
    ).unwrap();
  };

  return {
    handleLogout,
    handleRefreshToken,
    handleDeleteProperty,
    handleUpdateProperty,
    checkUserState,
    checkPropertyState,
    checkBookingState,
    dispatch,
  };
}

export default useStore;
