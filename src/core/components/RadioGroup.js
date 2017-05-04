/* @flow */
'use strict'

import React from 'react'
import { PropTypes } from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import _map from 'lodash/map'
import { orange500 } from 'material-ui/styles/colors'

const customStyle = {
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: '500'
  }
}

type RadioGroupProps = {
  title: string,
  value: string,
  onChange: () => void,
  name: string,
  options: Array<any>
}

type RadioGroupState = {
  chosed: string | null
}

class RadioGroup extends React.PureComponent {
  props: RadioGroupProps;
  state: RadioGroupState;

  constructor (props: RadioGroupProps) {
    super(props)
    this.state = { chosed: null }
  }
  handleChange (e: any) {
    const value = e.currentTarget.value
    this.setState({ chosed: value })
    this.props.onChange(value)
  }
  renderButtons () {
    const { options } = this.props
    const processIcon = (iconElem) => {
      if (!iconElem) return
      const style = iconElem.props.style
      const newStyle = { ...style, color: orange500 }
      return { ...iconElem, props: { ...iconElem.props, style: newStyle } }
    }

    return _map(options, (item, idx) => {
      return (
        <RadioButton
          key={idx}
          value={item.value}
          label={item.label}
          uncheckedIcon={item.checkedIcon}
          checkedIcon={processIcon(item.checkedIcon)}
        />
      )
    })
  }
  render () {
    return (
      <div>
        <h3 style={customStyle.title}>
          {this.props.title}
        </h3>
        <RadioButtonGroup
          valueSelected={this.props.value}
          onChange={(e) => this.handleChange(e)}
          name={this.props.name}
        >
          {this.renderButtons()}
        </RadioButtonGroup>
      </div>
    )
  }
}
export default RadioGroup

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    value: PropTypes.any.isRequired,
    checkedIcon: PropTypes.elem,
    uncheckedIcon: PropTypes.elem
  })).isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
/* options should have this shape
  [
    {
      label,
      value,
      icon
    }
  ] */
