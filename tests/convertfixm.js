#!/usr/bin/env node

var xml4json = require('../lib/xml4json');

var SCHEMAS = {
  'http://www.fixm.aero/base/4.2': ['./tests/xsd/FIXM/Address.xsd', './tests/xsd/FIXM/AeronauticalReference.xsd', './tests/xsd/FIXM/Base.xsd',
                                     './tests/xsd/FIXM/Extension.xsd', './tests/xsd/FIXM/FficeBase.xsd', './tests/xsd/FIXM/FficeFA_Base.xsd',
                                     './tests/xsd/FIXM/FficeFA_Organization.xsd', './tests/xsd/FIXM/FficeFC_Base.xsd', './tests/xsd/FIXM/FficeFC_Organization.xsd',
                                     './tests/xsd/FIXM/FficeFD_Base.xsd', './tests/xsd/FIXM/FficeFD_Organization.xsd', './tests/xsd/FIXM/FficeFDRP_Base.xsd',
                                     './tests/xsd/FIXM/FficeFDRP_Organization.xsd', './tests/xsd/FIXM/FficeFDRQ_Base.xsd', './tests/xsd/FIXM/FficeFDRQ_Organization.xsd',
                                     './tests/xsd/FIXM/FficeFFP_Base.xsd', './tests/xsd/FIXM/FficeFFP_Organization.xsd', './tests/xsd/FIXM/FficeFPU_Base.xsd',
                                     './tests/xsd/FIXM/FficeFPU_Organization.xsd', './tests/xsd/FIXM/FficeFS_Base.xsd', './tests/xsd/FIXM/FficeFS_Organization.xsd',
                                     './tests/xsd/FIXM/FficePFP_Base.xsd', './tests/xsd/FIXM/FficePFP_Organization.xsd', './tests/xsd/FIXM/FficePS_Base.xsd',
                                     './tests/xsd/FIXM/FficePS_Organization.xsd', './tests/xsd/FIXM/FficeSR_Base.xsd', './tests/xsd/FIXM/FficeSR_Organization.xsd',
                                     './tests/xsd/FIXM/FficeTRP_Base.xsd', './tests/xsd/FIXM/FficeTRP_Organization.xsd', './tests/xsd/FIXM/FficeTRQ_Base.xsd',
                                     './tests/xsd/FIXM/FficeTRQ_Organization.xsd', './tests/xsd/FIXM/Measures.xsd', './tests/xsd/FIXM/Organization.xsd',
                                     './tests/xsd/FIXM/RangesAndChoices.xsd', './tests/xsd/FIXM/Types.xsd', './tests/xsd/FIXM/UnitOfMeasures.xsd'],


  'http://www.fixm.aero/flight/4.2' : ['./tests/xsd/FIXM/Aircraft.xsd', './tests/xsd/FIXM/Arrival.xsd', './tests/xsd/FIXM/Capability.xsd',
                                       './tests/xsd/FIXM/Cargo.xsd', './tests/xsd/FIXM/Constraints.xsd', './tests/xsd/FIXM/DangerousGoods.xsd',
                                       './tests/xsd/FIXM/Departure.xsd', './tests/xsd/FIXM/Emergency.xsd', './tests/xsd/FIXM/EnRoute.xsd',
                                       './tests/xsd/FIXM/FficeFA_Arrival.xsd', './tests/xsd/FIXM/FficeFA_Departure.xsd', 
                                       './tests/xsd/FIXM/FficeFA_Flight.xsd', './tests/xsd/FIXM/FficeFA_FlightData.xsd', './tests/xsd/FIXM/FficeFC_Arrival.xsd',
                                       './tests/xsd/FIXM/FficeFC_Departure.xsd', './tests/xsd/FIXM/FficeFC_Flight.xsd', './tests/xsd/FIXM/FficeFC_FlightData.xsd',
                                       './tests/xsd/FIXM/FficeFD_Arrival.xsd', './tests/xsd/FIXM/FficeFD_Departure.xsd', './tests/xsd/FIXM/FficeFD_Flight.xsd',
                                       './tests/xsd/FIXM/FficeFD_FlightData.xsd', './tests/xsd/FIXM/FficeFDRP_Flight.xsd', './tests/xsd/FIXM/FficeFDRP_FlightData.xsd',
                                       './tests/xsd/FIXM/FficeFDRQ_Arrival.xsd', './tests/xsd/FIXM/FficeFDRQ_Departure.xsd', './tests/xsd/FIXM/FficeFDRQ_Flight.xsd',
                                       './tests/xsd/FIXM/FficeFDRQ_FlightData.xsd', './tests/xsd/FIXM/FficeFFP_Aircraft.xsd', './tests/xsd/FIXM/FficeFFP_Arrival.xsd',
                                       './tests/xsd/FIXM/FficeFFP_Constraints.xsd', './tests/xsd/FIXM/FficeFFP_Departure.xsd', './tests/xsd/FIXM/FficeFFP_EnRoute.xsd',
                                       './tests/xsd/FIXM/FficeFFP_Flight.xsd', './tests/xsd/FIXM/FficeFFP_FlightData.xsd', './tests/xsd/FIXM/FficeFFP_FlightRouteTrajectory.xsd',
                                       './tests/xsd/FIXM/FficeFFP_RouteChanges.xsd', './tests/xsd/FIXM/FficeFFP_RouteTrajectory.xsd', './tests/xsd/FIXM/FficeFlight.xsd',
                                       './tests/xsd/FIXM/FficeFPU_Arrival.xsd','./tests/xsd/FIXM/FficeFPU_Constraints.xsd', './tests/xsd/FIXM/FficeFPU_Departure.xsd',
                                       './tests/xsd/FIXM/FficeFPU_EnRoute.xsd', './tests/xsd/FIXM/FficeFPU_Flight.xsd', './tests/xsd/FIXM/FficeFPU_FlightData.xsd',
                                       './tests/xsd/FIXM/FficeFPU_FlightRouteTrajectory.xsd', './tests/xsd/FIXM/FficeFPU_RouteChanges.xsd', './tests/xsd/FIXM/FficeFPU_RouteTrajectory.xsd',
                                       './tests/xsd/FIXM/FficeFS_Constraints.xsd', './tests/xsd/FIXM/FficeFS_Flight.xsd', './tests/xsd/FIXM/FficeFS_FlightData.xsd', 
                                       './tests/xsd/FIXM/FficeFS_FlightRouteTrajectory.xsd', './tests/xsd/FIXM/FficeFS_RouteChanges.xsd', './tests/xsd/FIXM/FficeFS_RouteTrajectory.xsd',
                                       './tests/xsd/FIXM/FficePFP_Arrival.xsd', './tests/xsd/FIXM/FficePFP_Constrainst.xsd', './tests/xsd/FIXM/FficePFP_Departure.xsd',
                                       './tests/xsd/FIXM/FficePFP_EnRoute.xsd', './tests/xsd/FIXM/FficePFP_Flight.xsd', './tests/xsd/FIXM/FficePFP_FlightData.xsd',
                                       './tests/xsd/FIXM/FficePFP_FlightRouteTrajectory.xsd', './tests/xsd/FIXM/FficePFP_RankedTrajectory.xsd', './tests/xsd/FIXM/FficePFP_RouteChanges.xsd',
                                       './tests/xsd/FIXM/FficePFP_RouteTrajectory.xsd', './tests/xsd/FIXM/FficePS_Constraints.xsd', './tests/xsd/FIXM/FficePS_Flight.xsd',
                                       './tests/xsd/FIXM/FficePS_FlightData.xsd', './tests/xsd/FIXM/FficePS_FlightRouteTrajectory.xsd', './tests/xsd/FIXM/FficePS_RouteChanges.xsd',
                                       './tests/xsd/FIXM/FficePS_RouteTrajectory.xsd', './tests/xsd/FIXM/FficeSR_Flight.xsd', './tests/xsd/FIXM/FficeSR_FlightData.xsd',
                                       './tests/xsd/FIXM/FficeTRP_Constrainst.xsd', './tests/xsd/FIXM/FficeTRP_Flight.xsd', './tests/xsd/FIXM/FficeTRP_FlightData.xsd',
                                       './tests/xsd/FIXM/FficeTRP_FlightRouteTrajectory.xsd', './tests/xsd/FIXM/FficeTRP_RouteChanges.xsd', './tests/xsd/FIXM/FficeTRP_RouteTrajectory.xsd',
                                       './tests/xsd/FIXM/FficeTRQ_Arrival.xsd', './tests/xsd/FIXM/FficeTRQ_Constraints.xsd', './tests/xsd/FIXM/FficeTRQ_Departure.xsd', './tests/xsd/FIXM/FficeTRQ_EnRoute.xsd',
                                       './tests/xsd/FIXM/FficeTRQ_Flight.xsd', './tests/xsd/FIXM/FficeTRQ_FlightData.xsd', './tests/xsd/FIXM/FficeTRQ_FlightRouteTrajectory.xsd',
                                       './tests/xsd/FIXM/FficeTRQ_RankedTrajectory.xsd', './tests/xsd/FIXM/FficeTRQ_RouteChanges.xsd', './tests/xsd/FIXM/FficeTRQ_RouteTrajectory.xsd',
                                       './tests/xsd/FIXM/Flight.xsd', './tests/xsd/FIXM/FlightData.xsd', './tests/xsd/FIXM/FlightRouteTrajectory.xsd', './tests/xsd/FIXM/Packaging.xsd',
                                       './tests/xsd/FIXM/RadioactiveMaterials.xsd', './tests/xsd/FIXM/RankedTrajectory.xsd', './tests/xsd/FIXM/RouteChanges.xsd', './tests/xsd/FIXM/RouteTrajectory.xsd'],


  'http://www.fixm.aero/app/ffice2/1.0': './tests/xsd/FIXM/Ffice2Message.xsd',

  'http://www.fixm.aero/app/msg/1.0': './tests/xsd/FIXM/BasicMessage.xsd',

  'http://www.fixm.aero/app/ffice/1.0': ['./tests/xsd/FIXM/FficeFA_FficeMessage.xsd', './tests/xsd/FIXM/FficeFC_FficeMessage.xsd', './tests/xsd/FIXM/FficeFD_FficeMessage.xsd',
                                        './tests/xsd/FIXM/FficeFDRP_FficeMessage.xsd', './tests/xsd/FIXM/FficeFDRQ_FficeMessage.xsd', './tests/xsd/FIXM/FficeFFP_FficeMessage.xsd',
                                        './tests/xsd/FIXM/FficeFPU_FficeMessage.xsd', './tests/xsd/FIXM/FficeFS_FficeMessage.xsd', './tests/xsd/FIXM/FficeMessage.xsd',
                                        './tests/xsd/FIXM/FficePFP_FficeMessage.xsd', './tests/xsd/FIXM/FficePS_FficeMessage.xsd', './tests/xsd/FIXM/FficeSR_FficeMessage.xsd',
                                        './tests/xsd/FIXM/FficeTemplates.xsd', './tests/xsd/FIXM/FficeTRP_FficeMessage.xsd', './tests/xsd/FIXM/FficeTRQ_FficeMessage.xsd',
                                        './tests/xsd/FIXM/FiledFlightPlan.xsd', './tests/xsd/FIXM/FilingStatus.xsd', './tests/xsd/FIXM/FlightArrival.xsd', './tests/xsd/FlightCancellation.xsd',
                                        './tests/xsd/FIXM/FlightDataRequest.xsd', './tests/xsd/FIXM/FlightDataResponse.xsd', './tests/xsd/FIXM/FlightDeparture.xsd',
                                        './tests/xsd/FIXM/FlightPlanUpdate.xsd', './tests/xsd/FIXM/PlanningStatus.xsd', './tests/xsd/FIXM/PreliminaryFlightPlan.xsd',
                                        './tests/xsd/FIXM/SubmissionResponse.xsd', './tests/xsd/FIXM/TrialRequest.xsd', './tests/xsd/FIXM/TrialResponse.xsd'],


  'http://www.fixm.aero/ext/nas/4.3': ['./tests/xsd/FIXM/Nas.xsd', './tests/xsd/FIXM/NasAircraft.xsd', './tests/xsd/FIXM/NasAirspace.xsd', './tests/xsd/FIXM/NasAltitude.xsd',
                                      './tests/xsd/FIXM/Capability.xsd', './tests/xsd/FIXM/NasArrival.xsd', './tests/xsd/FIXM/NasCommon.xsd', './tests/xsd/FIXM/NasDeparture.xsd',
                                      './tests/xsd/FIXM/NasEnRoute.xsd', './tests/xsd/FIXM/NasFlightData.xsd', './tests/xsd/FIXM/NasFlightIntent.xsd', './tests/xsd/FIXM/NasMeasures.xsd',
                                      './tests/xsd/FIXM/NasMessage.xsd', './tests/xsd/FIXM/NasOrganization.xsd', './tests/xsd/FIXM/NasPosition.xsd', './tests/xsd/FIXM/NasRoute.xsd',
                                      './tests/xsd/FIXM/NasStatus.xsd', './tests/xsd/FIXM/NasTfdm.xsd', './tests/xsd/FIXM/NasTim.xsd', './tests/xsd/FIXM/NasTimData.xsd',
                                      './tests/xsd/FIXM/NasTmiConstrainedAirspace.xsd']
};

xml4json({
  downloadSchemas: false
}, SCHEMAS);
