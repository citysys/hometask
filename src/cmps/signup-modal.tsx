
import { Modal } from 'antd'

interface SignupModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SignupModal({ isModalOpen, setIsModalOpen }: SignupModalProps) {

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="modal-wrapper" dir="rtl">

            <Modal
                title="נרשמת בהצלחה"
                okText="בסדר"
                cancelText="בטל"
                open={isModalOpen}
                onCancel={handleClose}
                onOk={handleClose}
            >

                <p>החשבון שלך נוצר בהצלחה</p>


            </Modal>
        </div>

    )
}