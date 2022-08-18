const { DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "Transactions",
        {
            status: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cost:{
                type:DataTypes.STRING(),
                allowNull:false
            },
            userId:{
                type:DataTypes.INTEGER(),
                allowNull:false
            },
            cus_address: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cus_name: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cus_email: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cus_phone: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cus_city: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cus_country: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            cus_zip: {
                type: DataTypes.INTEGER(),
                allowNull: false,
            },
            instrument:{
                type:DataTypes.ARRAY(DataTypes.JSONB()),
                allowNull:false
            },

        },
        { timestamps: true }
    );
};



// items:[
//     {
//       id: 6,
//       name: 'Ukelele Soprano Acústico Texas, Glossy Purple KU-BW-P',
//       brand: 'Texas',
//       price: 149000,
//       img: 'https://lacolonial.com.co/pub/media/catalog/product/cache/fce05c1f7475c409d5310805c0d06f78/2/0/20_2.jpg',
//       description: 'Ukelele Soprano fabricado en tilo. 12 trastes e incluye forro. Este ukelele es ideal para principiantes.',
//       stock: 10,
//       status: 'New',
//       isBanned: false,
//       adminId: null,
//       categoryId: 1,
//       category: { id: 1, name: 'stringed', isBanned: false },
//       count: 1
//     },
//     {
//       id: 5,
//       name: 'Violin 4/4 Rumano Gliga Master Series M-V044',
//       brand: 'Gliga',
//       price: 7271500,
//       img: 'https://lacolonial.com.co/pub/media/catalog/product/cache/fce05c1f7475c409d5310805c0d06f78/v/2/v23.jpg',
//       description: 'Su sonido cálido y encantador puede hacerte olvidar rápidamente que no gastaste una fortuna en tu violín de concierto. Importado
//   directamente del maestro luthier Vasile Gliga en los talleres cerca de los bosques de Transylvanian del Valle de Italia, Gliga Violins se enorgullece de poder traer tanto a músicos aficionados como profesionales, violas, violonchelos, violines y contrabajos de muy alta calidad.',
//       stock: 10,
//       status: 'New',
//       isBanned: false,
//       adminId: null,
//       categoryId: 1,
//       category: { id: 1, name: 'stringed', isBanned: false },
//       count: 1
//     }
//   ]
//   id:pm_1LYAEdGZCoUhdempRDFhA3mC
//   costo:7420500
//   token:{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VyX3JvbCI6InVzZXIiLCJpYXQiOjE2NjA4MzQ3Njl9.heDXEl3pNGRtUZqnTymSgxeafz-S8p7B22oRKZLuPnk"}
//   userInfo:{
//     cus_name: 'ezequiel',
//     cus_email: 'ezequiel@hotmail.com',
//     cus_phone: '1154655451',
//     cus_address: 'arad123',
//     cus_city: 'capital',
//     cus_country: 'argentina',
//     cus_zip: '2'
//   }