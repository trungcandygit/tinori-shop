import { PrismaClient } from '@prisma/client'

function getRandomFloat(min, max, precision) {
   if (min >= max || precision < 0) {
      throw new Error(
         'Invalid input: min should be less than max and precision should be non-negative.'
      )
   }

   const range = max - min
   const randomValue = Math.random() * range + min

   return parseFloat(randomValue.toFixed(precision))
}

function getRandomIntInRange(min: number, max: number) {
   return Math.floor(Math.random() * (max - min) + min)
}

function getRandomDate(start, end) {
   return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
   )
}

function getRandomBoolean() {
   return getRandomIntInRange(0, 2) == 0 ? false : true
}

const prisma = new PrismaClient()

async function main() {
   let createdProducts = [],
      createdProviders = []

   const providers = ['VNPay', 'MoMo', 'ZaloPay']

   const owners = ['admin@tinori.vn']

   const categories = [
      'Áo',
      'Quần',
      'Váy & Đầm',
      'Phụ Kiện',
      'Giày Dép',
      'Túi Xách',
      'Đồ Thể Thao',
   ]

   const products = [
      {
         title: 'Áo Sơ Mi Trắng Cổ Điển',
         brand: 'Tinori Fashion',
         categories: ['Áo'],
         keywords: ['áo sơ mi', 'trắng', 'cổ điển', 'công sở'],
         price: 350000,
         discount: 0,
         stock: 25,
         description: 'Áo sơ mi trắng cổ điển, chất liệu cotton 100%, phù hợp đi làm và dạo phố. Form dáng chuẩn, thoáng mát, dễ phối đồ.',
         images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'],
      },
      {
         title: 'Váy Maxi Hoa Nhí Mùa Hè',
         brand: 'Bloom Dress',
         categories: ['Váy & Đầm'],
         keywords: ['váy maxi', 'hoa nhí', 'mùa hè', 'đi biển'],
         price: 480000,
         discount: 50000,
         stock: 30,
         description: 'Váy maxi dáng dài họa tiết hoa nhí nhỏ xinh, chất liệu voan mềm mại, thoáng mát. Phù hợp đi biển, dã ngoại hoặc dạo phố ngày hè.',
         images: ['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800'],
      },
      {
         title: 'Áo Khoác Jean Phong Cách',
         brand: 'Urban Denim',
         categories: ['Áo'],
         keywords: ['áo khoác', 'jean', 'denim', 'street style'],
         price: 650000,
         discount: 100000,
         stock: 15,
         description: 'Áo khoác jean phong cách street style, chất denim dày dặn, form rộng trendy. Dễ dàng phối với áo thun hoặc váy để tạo nên outfit cá tính.',
         images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
      },
      {
         title: 'Quần Jogger Thể Thao Cotton',
         brand: 'Active Zone',
         categories: ['Quần'],
         keywords: ['quần jogger', 'thể thao', 'cotton', 'tập gym'],
         price: 299000,
         discount: 0,
         stock: 40,
         description: 'Quần jogger chất cotton co giãn 4 chiều, thoáng khí và thấm hút mồ hôi tốt. Phù hợp tập gym, yoga, chạy bộ hoặc mặc ở nhà.',
         images: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800'],
      },
      {
         title: 'Túi Tote Canvas Thời Trang',
         brand: 'EcoStyle',
         categories: ['Túi Xách'],
         keywords: ['túi tote', 'canvas', 'thân thiện môi trường', 'đi học'],
         price: 199000,
         discount: 0,
         stock: 50,
         description: 'Túi tote vải canvas dày dặn, sức chứa lớn. Thiết kế đơn giản nhưng thời trang, phù hợp đi học, đi chợ hoặc dạo phố.',
         images: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800'],
      },
      {
         title: 'Giày Sneaker Trắng Basic',
         brand: 'StepUp',
         categories: ['Giày Dép'],
         keywords: ['giày sneaker', 'trắng', 'basic', 'năng động'],
         price: 520000,
         discount: 70000,
         stock: 20,
         description: 'Giày sneaker trắng classic không bao giờ lỗi mốt. Đế cao su chống trơn trượt, lót giày êm ái. Phối được với mọi loại trang phục từ casual đến smart casual.',
         images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      },
      {
         title: 'Đầm Công Sở Thanh Lịch',
         brand: 'Office Lady',
         categories: ['Váy & Đầm'],
         keywords: ['đầm công sở', 'thanh lịch', 'chuyên nghiệp', 'nữ'],
         price: 720000,
         discount: 120000,
         stock: 18,
         description: 'Đầm công sở dáng A-line thanh lịch, chất liệu cao cấp chống nhăn. Thiết kế tinh tế phù hợp môi trường văn phòng và các buổi họp quan trọng.',
         images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
      },
      {
         title: 'Mũ Bucket Thời Trang',
         brand: 'Trendy Hats',
         categories: ['Phụ Kiện'],
         keywords: ['mũ bucket', 'thời trang', 'che nắng', 'unisex'],
         price: 159000,
         discount: 0,
         stock: 60,
         description: 'Mũ bucket phong cách retro đang được giới trẻ yêu thích. Chất liệu vải mềm, có thể gấp gọn bỏ túi, che nắng hiệu quả.',
         images: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800'],
      },
      {
         title: 'Áo Thun Oversize In Hình',
         brand: 'Street Vibe',
         categories: ['Áo'],
         keywords: ['áo thun', 'oversize', 'in hình', 'unisex'],
         price: 250000,
         discount: 30000,
         stock: 35,
         description: 'Áo thun oversize in hình graphic độc đáo, chất cotton mềm mịn thoáng mát. Form rộng thoải mái, phù hợp cả nam và nữ.',
         images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
      },
      {
         title: 'Bộ Đồ Ngủ Lụa Cao Cấp',
         brand: 'Silk Dream',
         categories: ['Đồ Thể Thao'],
         keywords: ['đồ ngủ', 'lụa', 'cao cấp', 'thoải mái'],
         price: 890000,
         discount: 150000,
         stock: 12,
         description: 'Bộ đồ ngủ chất lụa mềm mại cao cấp, cảm giác mát mẻ và dễ chịu. Thiết kế thanh lịch, màu sắc nhẹ nhàng phù hợp làm quà tặng.',
         images: ['https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800'],
      },
   ]

   const blogPosts = [
      {
         slug: 'xu-huong-thoi-trang-2024',
         title: 'Xu Hướng Thời Trang Nữ Nổi Bật Năm 2024',
         description: 'Khám phá những xu hướng thời trang nổi bật nhất năm 2024 mà bạn không thể bỏ qua...',
         image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
         categories: ['thời trang', 'xu hướng'],
         content:
            'Năm 2024 mang đến nhiều xu hướng thời trang thú vị và đa dạng. Từ phong cách minimalist thanh lịch đến streetwear cá tính, mỗi phong cách đều có sức hút riêng. Màu sắc nổi bật năm nay là tông màu đất (earth tone), pastel và các gam màu rực rỡ như coral, cobalt blue. Về chất liệu, vải tự nhiên như linen, cotton hữu cơ và lụa tiếp tục được ưa chuộng nhờ tính thân thiện với môi trường và cảm giác thoải mái khi mặc.',
      },
      {
         slug: 'meo-phoi-do-hang-ngay',
         title: 'Bí Kíp Phối Đồ Hàng Ngày Đơn Giản Mà Đẹp',
         description: 'Những gợi ý phối đồ đơn giản nhưng cực kỳ thời trang cho các cô gái bận rộn...',
         image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
         categories: ['phối đồ', 'tips thời trang'],
         content:
            'Phối đồ đẹp không nhất thiết phải có tủ quần áo đầy ắp hay những món đồ hàng hiệu đắt tiền. Bí quyết nằm ở việc lựa chọn những item cơ bản chất lượng và biết cách kết hợp chúng thông minh. Chiếc áo sơ mi trắng, quần jeans xanh và sneaker trắng – bộ ba này chưa bao giờ lỗi mốt và có thể phối được trong mọi hoàn cảnh. Hãy đầu tư vào những item tốt thay vì mua nhiều đồ rẻ tiền không bền.',
      },
      {
         slug: 'thoi-trang-ben-vung',
         title: 'Thời Trang Bền Vững: Xu Hướng Của Tương Lai',
         description: 'Thời trang bền vững không chỉ là xu hướng mà còn là trách nhiệm của mỗi người...',
         image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
         categories: ['bền vững', 'môi trường', 'thời trang'],
         content:
            'Ngành thời trang đang chuyển mình mạnh mẽ theo hướng bền vững và thân thiện với môi trường. Nhiều thương hiệu lớn đã cam kết sử dụng nguyên liệu tái chế, giảm lượng nước và carbon trong quá trình sản xuất. Với tư cách là người tiêu dùng, bạn có thể đóng góp bằng cách mua ít hơn nhưng chọn những món đồ chất lượng cao và bền vững, ủng hộ các thương hiệu có ý thức về môi trường, và thực hành tái chế quần áo cũ.',
      },
   ]

   const banners = [
      {
         image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600',
         label: 'Bộ Sưu Tập Mới Nhất 2024',
      },
      {
         image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600',
         label: 'Sale Mùa Hè - Giảm Đến 50%',
      },
      {
         image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600',
         label: 'Thời Trang Phong Cách - Phong Cách Của Bạn',
      },
      {
         image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600',
         label: 'Miễn Phí Vận Chuyển Đơn Từ 500K',
      },
   ]

   try {
      for (const banner of banners) {
         const { image, label } = banner

         await prisma.banner.create({
            data: {
               image,
               label,
            },
         })
      }

      console.log('Đã tạo Banners...')
   } catch (error) {
      console.error('Không thể tạo banners...')
   }

   try {
      for (const owner of owners) {
         await prisma.owner.create({
            data: {
               email: owner,
               name: 'Quản Trị Viên Tinori',
            },
         })
      }

      console.log('Đã tạo tài khoản Admin...')
   } catch (error) {
      console.error('Không thể tạo tài khoản admin...')
   }

   try {
      for (const category of categories) {
         await prisma.category.create({
            data: {
               title: category,
            },
         })
      }

      console.log('Đã tạo Danh mục...')
   } catch (error) {
      console.error('Không thể tạo danh mục...')
   }

   try {
      for (const product of products) {
         const createdProduct = await prisma.product.create({
            data: {
               isAvailable: true,
               isFeatured: getRandomBoolean(),
               title: product.title,
               price: product.price,
               stock: product.stock,
               discount: product.discount,
               brand: {
                  connectOrCreate: {
                     where: {
                        title: product.brand,
                     },
                     create: {
                        title: product.brand,
                        description: 'Thương hiệu thời trang chất lượng cao.',
                        logo: 'https://cdn.logojoy.com/wp-content/uploads/20221122125557/morridge-coffee-vintage-logo-600x392.png',
                     },
                  },
               },
               description: product.description,
               images: product.images,
               keywords: product.keywords,
               categories: {
                  connect: {
                     title: product.categories[0],
                  },
               },
            },
            include: {
               categories: true,
            },
         })

         createdProducts.push(createdProduct)
      }

      console.log('Đã tạo Sản phẩm...')
   } catch (error) {
      console.error('Không thể tạo sản phẩm...', error)
   }

   try {
      await prisma.author.create({
         data: {
            name: 'Nguyễn Thị Mai',
            email: 'admin@tinori.vn',
            blogs: {
               create: blogPosts,
            },
         },
      })

      console.log('Đã tạo Tác giả blog...')
   } catch (error) {
      console.error('Không thể tạo tác giả blog...')
   }

   const user = await prisma.user.create({
      data: {
         email: 'admin@tinori.vn',
         name: 'Nguyễn Văn Admin',
         cart: {
            create: {},
         },
         wishlist: {
            connect: {
               id: createdProducts[
                  getRandomIntInRange(0, createdProducts.length - 1)
               ]['id'],
            },
         },
      },
   })

   console.log('Đã tạo Người dùng...')

   for (const provider of providers) {
      const createdProvider = await prisma.paymentProvider.create({
         data: {
            title: provider,
            isActive: true,
         },
      })

      createdProviders.push(createdProvider)
   }

   console.log('Đã tạo Cổng thanh toán...')

   for (let i = 0; i < 10; i++) {
      const order = await prisma.order.create({
         data: {
            createdAt: getRandomDate(new Date(2024, 0, 1), new Date()),
            payable: getRandomFloat(200000, 2000000, 0),
            discount: getRandomFloat(0, 200000, 0),
            shipping: getRandomFloat(20000, 50000, 0),
            status: 'Processing',
            user: { connect: { id: user.id } },
            isPaid: true,
            payments: {
               create: {
                  status: 'Processing',
                  isSuccessful: true,
                  payable: getRandomFloat(200000, 2000000, 0),
                  refId: getRandomIntInRange(100000, 999999).toString(),
                  user: {
                     connect: { id: user.id },
                  },
                  provider: {
                     connect: {
                        id: createdProviders[
                           getRandomIntInRange(0, createdProviders.length - 1)
                        ].id,
                     },
                  },
               },
            },
            orderItems: {
               create: {
                  productId:
                     createdProducts[
                        getRandomIntInRange(0, createdProducts.length - 1)
                     ]?.id,
                  count: getRandomIntInRange(1, 3),
                  price: createdProducts[
                     getRandomIntInRange(0, createdProducts.length - 1)
                  ].price,
                  discount: 0,
               },
            },
         },
      })
   }

   console.log('Đã tạo Đơn hàng...')
}

try {
   main()
   prisma.$disconnect()
} catch (error) {
   console.error(error)
   process.exit(1)
}
