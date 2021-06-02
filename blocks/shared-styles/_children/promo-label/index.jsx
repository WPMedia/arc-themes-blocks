import React from 'react';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import { PlayIcon, CameraIcon } from '@wpmedia/engine-theme-sdk';
import getTranslatedPhrases from 'fusion:intl';
import getProperties from 'fusion:properties';

const LabelBoxLarge = styled.div`
  align-items: center;
  padding: 6px 8px 8px;
  background-color: ${(props) => props.primaryColor};
  border: 0;
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
  border: 0;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 8px;
  top: 8px;
`;

const Label = styled.span`
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  height: 12px;
  letter-spacing: normal;
  margin-left: 8px;
`;

export const getLabelText = (phrases, type) => {
  if (phrases && type) {
    switch (type) {
      case 'Video':
        return phrases.t('promo-label.video-text');
      case 'Gallery':
        return phrases.t('promo-label.gallery-text');
      default:
        return null;
    }
  }
  return null;
};

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

const LabelLarge = ({ arcSite, type, labelText }) => (
  <LabelBoxLarge className="promo-label" primaryColor={getThemeStyle(arcSite)['primary-color']}>
    <Icon type={type} />
    <Label>{labelText}</Label>
  </LabelBoxLarge>
);

const LabelSmall = ({ arcSite, type }) => (
  <LabelBoxSmall className="promo-label" primaryColor={getThemeStyle(arcSite)['primary-color']}>
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
    return <LabelSmall arcSite={arcSite} type={type} />;
  }

  const phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');

  return <LabelLarge arcSite={arcSite} type={type} labelText={getLabelText(phrases, type)} />;
};

export default PromoLabel;
