// const Bustable = require('../models/Bustable');

// const busController = {
//   createBus: async (req, res) => {
//     try {
//       const { busNumber, total_busseat, avaialabe_seat } = req.body;

//       const newBus = await Bustable.create({ busNumber, total_busseat, avaialabe_seat });

//       console.log('Bus created:', newBus.toJSON());
//       res.status(201).json({ success: true, data: newBus });
//     } catch (error) {
//       console.error('Create bus error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   },

//   getAllBuses: async (req, res) => {
//     try {
//       const buses = await Bustable.findAll();
//       res.status(200).json({ success: true, data: buses });
//     } catch (error) {
//       console.error('Get all buses error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   },

//   getBusById: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const bus = await Bustable.findByPk(id);

//       if (!bus) {
//         console.log('Bus not found with ID:', id);
//         return res.status(404).json({ success: false, message: 'Bus not found' });
//       }

//       res.status(200).json({ success: true, data: bus });
//     } catch (error) {
//       console.error('Get bus by ID error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   },

//   updateBus: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { busNumber, total_busseat, avaialabe_seat } = req.body;

//       const bus = await Bustable.findByPk(id);

//       if (!bus) {
//         console.log('Update failed: Bus not found with ID:', id);
//         return res.status(404).json({ success: false, message: 'Bus not found' });
//       }

//       await bus.update({ busNumber, total_busseat, avaialabe_seat });

//       console.log('Bus updated:', bus.toJSON());
//       res.status(200).json({ success: true, data: bus });
//     } catch (error) {
//       console.error('Update bus error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   },

//   deleteBus: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const bus = await Bustable.findByPk(id);

//       if (!bus) {
//         console.log('Delete failed: Bus not found with ID:', id);
//         return res.status(404).json({ success: false, message: 'Bus not found' });
//       }

//       await bus.destroy();
//       console.log('Bus deleted:', bus.toJSON());

//       res.status(200).json({ success: true, message: 'Bus deleted successfully' });
//     } catch (error) {
//       console.error('Delete bus error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   }
// };

// module.exports = busController;
