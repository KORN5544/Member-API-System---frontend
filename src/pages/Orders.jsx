import { useState, useEffect } from 'react'
import api from '../services/api'

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        totalAmount: ""
    });

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.get('/orders');
            setOrders(response.data.data || []);
        } catch (err) {
            console.error(err);
            setError("ไม่สามารถดึงข้อมูลสมาชิกได้");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const hadleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/orders', formData);

            setFormData({
                customerName: "",
                email: "",
                phone: "",
                totalAmount: ""
            })

            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="bi bi-cart-fill text-orange-600"></i>
                    จัดการคำสั่งซื้อ
                </h1>

                <form onSubmit={hadleSubmit}>
                    <input type="text" name='customerName' value={formData.customerName} onChange={handleChange} placeholder='ชื่อผู้ใช่' required />

                    <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='อีเมล' required />

                    <input type="text" name='phone' value={formData.phone} onChange={handleChange} placeholder='เบอร์' required />

                    <input type="text" name='totalAmount' value={formData.totalAmount} onChange={handleChange} placeholder='ยอดรวม' required />


                    <button type='submit'>ส่งข้อมูล</button>
                </form>

                {loading && <p>Loading....</p>}

                {error && (
                    <p className='text-red-500'>{error}</p>
                )}

                {!loading && !error && (
                    <table className="min-w-full border mb-6">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">customerName</th>
                                <th className="border px-4 py-2">email</th>
                                <th className="border px-4 py-2">phone</th>
                                <th className="border px-4 py-2">totalAmount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <th className="border px-4 py-2">{order.customerName}</th>
                                        <th className="border px-4 py-2">{order.email}</th>
                                        <th className="border px-4 py-2">{order.phone}</th>
                                        <th className="border px-4 py-2">{order.totalAmount}</th>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">ไม่พบสินค้า</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-gray-700 flex items-center gap-2">
                        <i className="bi bi-info-circle-fill text-orange-600"></i>
                        หน้านี้จะใช้สำหรับแสดงและจัดการคำสั่งซื้อทั้งหมด
                    </p>
                    <p className="text-gray-600 text-sm mt-2 ml-6">
                        (ในส่วนของ Part 2 เราจะเพิ่มการเชื่อมต่อกับ API)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Orders