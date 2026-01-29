import { useState, useEffect } from 'react'
import api from '../services/api'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: ""
    });

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.get('/products');
            setProducts(response.data.data || []);
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
            await api.post('/products', formData);

            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "",
                imageUrl: ""
            })

            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="bi bi-box-seam-fill text-green-600"></i>
                    จัดการข้อมูลสินค้า
                </h1>

                <form onSubmit={hadleSubmit}>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='ชื่อผู้ใช่' required />

                    <input type="text" name='description' value={formData.description} onChange={handleChange} placeholder='คำอธิบาย' required />

                    <input type="text" name='price' value={formData.price} onChange={handleChange} placeholder='ราคา' required />

                    <input type="text" name='stock' value={formData.stock} onChange={handleChange} placeholder='คลัง' required />

                    <input type="text" name='category' value={formData.category} onChange={handleChange} placeholder='หมวดหมู่' required />

                    <input type="text" name='imageUrl' value={formData.imageUrl} onChange={handleChange} placeholder='ลิ้งรูปภาพ' required />

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
                                <th className="border px-4 py-2">name</th>
                                <th className="border px-4 py-2">description</th>
                                <th className="border px-4 py-2">price</th>
                                <th className="border px-4 py-2">stock</th>
                                <th className="border px-4 py-2">category</th>
                                <th className="border px-4 py-2">imageUrl</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ? (
                                products.map(product => (
                                    <tr key={product.id}>
                                        <th className="border px-4 py-2">{product.name}</th>
                                        <th className="border px-4 py-2">{product.description}</th>
                                        <th className="border px-4 py-2">{product.price}</th>
                                        <th className="border px-4 py-2">{product.stock}</th>
                                        <th className="border px-4 py-2">{product.category}</th>
                                        <th className="border px-4 py-2">{product.imageUrl}</th>
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

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-700 flex items-center gap-2">
                        <i className="bi bi-info-circle-fill text-green-600"></i>
                        หน้านี้จะใช้สำหรับแสดงและจัดการข้อมูลสินค้าทั้งหมด
                    </p>
                    <p className="text-gray-600 text-sm mt-2 ml-6">
                        (ในส่วนของ Part 2 เราจะเพิ่มการเชื่อมต่อกับ API)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Products