import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  // Main container styles
  safeArea: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
  },
  container: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
  },
  content: {
    padding: 15,
  },

  // Section styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BaseColor.textPrimaryColor,
    marginBottom: 15,
    marginTop: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  showcaseContainer: {
    marginBottom: 20,
  },

  // Image background styles
  imageBackground: {
    height: 140,
    width: '100%',
    position: 'absolute',
  },

  // Search form styles
  searchForm: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    width: '90%',
    shadowColor: 'black',
    shadowOffset: { width: 2.5, height: 2.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },

  // Service content styles
  contentServiceIcon: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentCartPromotion: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnPromotion: {
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  // Content sections
  contentHiking: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: '100%',
    marginTop: 10,
  },

  // Divider line
  line: {
    height: 1,
    backgroundColor: BaseColor.textSecondaryColor,
    marginTop: 10,
    marginBottom: 10,
  },

  // Icon styles
  iconContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BaseColor.fieldColor,
  },

  // Item styles
  itemService: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
  },
  promotionItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(250),
  },
  tourItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160),
  },

  // Pagination styles
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  indicatorInactive: {
    width: 8,
    height: 8,
    borderRadius: 5,
    borderColor: '#0A1F42',
    borderWidth: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },

  // Modern card styles
  card: {
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Button styles
  primaryButton: {
    backgroundColor: BaseColor.primaryColor,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: BaseColor.whiteColor,
    fontSize: 16,
    fontWeight: '600',
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: BaseColor.errorColor || '#FF0000',
    fontSize: 16,
    textAlign: 'center',
  },
});
