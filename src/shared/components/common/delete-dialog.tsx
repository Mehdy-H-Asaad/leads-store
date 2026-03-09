import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type TDeleteDialog = {
  deleteFunc: () => void;
  trigger: string;
  isLoading: boolean;
};

export const DeleteDialog = ({
  deleteFunc,
  trigger,
  isLoading,
}: TDeleteDialog) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600 duration-200 text-white hover:bg-red-700 hover:text-white! cursor-pointer w-full text-center justify-center px-4 py-1 flex font-bold rounded-lg ">
          {trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white light:text-black dark:bg-main-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will be permanently deleted and
            removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            className="border light:text-black hover:bg-black hover:text-white  duration-200"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isLoading}
            onClick={() => deleteFunc()}
            className="capitalize duration-200 hover:bg-red-700 font-semibold hover:text-white text-white bg-red-600"
          >
            {isLoading ? "Deleting..." : trigger}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};