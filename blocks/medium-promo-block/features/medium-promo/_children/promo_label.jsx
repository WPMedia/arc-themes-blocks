import React from 'react';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import styled from 'styled-components';
import PlayIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/PlayIcon';
import CameraIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/CameraIcon';

const LabelBoxLarge = styled.div`
  align-items: center;
  padding: 6px 8px 8px;
  background-color: ${(props) => props.primaryColor};
  border: none;
  border-radius: 4px;
  bottom: 8px;
  display: flex;
  flex-direction: row;
  left: 8px;
  position: absolute;
`;

const LabelBoxSmall = styled.div`
  align-items: center;
  padding: 8px;
  background-color: ${(props) => props.primaryColor};
  border: none;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 8px;
  top: 8px;
`;

const Label = styled.span`
  color: white;
  font-family: Arial;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  height: 12px;
  letter-spacing: normal;
  margin-left: 8px;
`;

const Icon = ({ type }) => {
  switch (type) {
    case 'Video':
      return <PlayIcon fill="white" height={18} width={18} />;
    case 'Gallery':
      return <CameraIcon fill="white" height={18} width={18} />;
    default:
      return null;
  }
};

const LabelLarge = ({ arcSite, type }) => (
  <LabelBoxLarge className="promo-label" primaryColor={getThemeStyle(getProperties(arcSite))['primary-color']}>
    <Icon type={type} />
    <Label>{type}</Label>
  </LabelBoxLarge>
);

const LabelSmall = ({ arcSite, type }) => (
  <LabelBoxSmall className="promo-label" primaryColor={getThemeStyle(getProperties(arcSite))['primary-color']}>
    <Icon type={type} />
  </LabelBoxSmall>
);

const PromoLabel = ({ type, size }) => {
  const { arcSite } = useFusionContext();
  if (!type || type === 'other') {
    return null;
  }

  const labelSize = size || 'large';

  if (labelSize === 'small') {
    return <LabelSmall type={type} arcSite={arcSite} />;
  }

  return <LabelLarge type={type} arcSite={arcSite} />;
};

export default PromoLabel;
