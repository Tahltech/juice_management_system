import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '../Components/ToastProvider';

export const useFlashToasts = () => {
    const { flash } = usePage().props;
    const toast = useToast();

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.warning) {
            toast.warning(flash.warning);
        }
        if (flash?.info) {
            toast.info(flash.info);
        }
    }, [flash, toast]);
};

export default useFlashToasts;
