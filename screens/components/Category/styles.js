import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,    
    height: 215,
    margin:10 ,
    backgroundColor: '#fff'
  },

  categoriesItemContainer: {
    flex: 1,     
  },

  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',    
    color: '#333333',
    marginTop: 8,
  },
  categoriesInfo: {
    alignSelf: 'center',
    marginTop: 3,
    marginBottom: 5
  }
});

export default styles;
