import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { FaTrash } from 'react-icons/fa';

type DeleteType={
    handleDelete:()=>void
}
const DeleteDailog = ({handleDelete}:DeleteType) => {
    // const {handleDelete}=props
    const [isDelete, setIsDelete] = useState(false);
  return (
    <div>
         
      <button
                        // onClick={() => onDelete(l.code)}
                        onClick={() => setIsDelete(true)}
                        title="Delete"
                        className="text-xs p-1 border rounded text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <FaTrash />
                      </button>
    <Dialog open={isDelete} onOpenChange={setIsDelete}>
            <DialogContent className='mb-[10]  max-h-[40.6875rem]  lg:max-w-[500px] p-0'>
            
              <DialogHeader><h2 className="text-xl font-semibold mb-4 p-4">Are you sure?</h2></DialogHeader>
              <div className="  flex items-center justify-center">
          <div className=" p-6 max-w-sm w-full">
            
            <p className="text-gray-600 mb-6">You will not be able to recover the short link!</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={()=>setIsDelete(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={()=>{ setIsDelete(false); handleDelete(); }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Yes, delete it!
              </button>
            </div>
          </div>
        </div>
              </DialogContent>
          </Dialog>
          </div>
  )
}

export default DeleteDailog