import { Plus, Minus } from "lucide-react";

const NormalEventForm = ({ formData, setFormData, price }) => (
    <>
        <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.fullName}
                onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                }
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
                type="email"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
                type="tel"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.phone}
                onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                }
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">
                Number of Tickets
            </label>
            <div className="flex items-center space-x-2">
                <button
                    type="button"
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            numberOfTickets: Math.max(1, prev.numberOfTickets - 1),
                        }))
                    }
                    className="p-1 border rounded"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <input
                    type="number"
                    min="1"
                    required
                    className="w-20 p-2 border rounded-lg text-center"
                    value={formData.numberOfTickets}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            numberOfTickets: Math.max(
                                1,
                                parseInt(e.target.value) || 1
                            ),
                        })
                    }
                />
                <button
                    type="button"
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            numberOfTickets: prev.numberOfTickets + 1,
                        }))
                    }
                    className="p-1 border rounded"
                >
                    <Plus className="w-4 h-4" />
                </button>
                {price > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                        Total: {price * formData.numberOfTickets} DT
                    </span>
                )}
            </div>
        </div>
    </>
);

export default NormalEventForm;
