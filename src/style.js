/* @flow */
'use strict'

export default {
  card: {
    width: '70%',
    margin: 'auto',
    maxWidth: '700px',
    minWidth: '500px'
  },
  cardImg: {
    maxHeight: '250px',
    overflow: 'hidden',
    margin: 'auto'
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  listHeader: {
    fontWeight: '500',
    fontSize: '18px',
    textTransform: 'uppercase'
  },
  listItem: {
    fontWeight: '300',
    lineHeight: '120%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    wordWrap: 'break-word'
  },
  info: {
    marginLeft: '6px'
  },
  summary: {
    marginLeft: '16px',
    marginRight: '12px',
    textAlign: 'left',
    fontSize: '14px',
    // maxHeight: '80px',
    overflow: 'auto'
  },
  icon: {
    width: '24px',
    height: '24px'
  },
  actionButton: {
    position: 'fixed',
    right: '70px',
    bottom: '50px'
  },
  searchBar: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '15%',
    width: '50%',
    zIndex: 1
  },
  cardCreate: {
    fileButton: {
      float: 'right',
      zIndex: 3
    }
  }
}
