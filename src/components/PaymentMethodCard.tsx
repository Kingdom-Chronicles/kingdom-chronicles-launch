import { LucideIcon } from 'lucide-react';

interface PaymentMethodCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  isDisabled?: boolean;
  comingSoonText?: string;
}

const PaymentMethodCard = ({
  icon: Icon,
  name,
  description,
  isSelected,
  onClick,
  isDisabled = false,
  comingSoonText = 'Coming Soon',
}: PaymentMethodCardProps) => {
  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`p-4 rounded-lg border-2 transition-all text-left relative ${
        isDisabled
          ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
          : isSelected
          ? 'border-indigo-600 bg-indigo-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {isDisabled && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gray-400 transform rotate-12"></div>
        </div>
      )}
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isDisabled
              ? 'bg-gray-200'
              : isSelected
              ? 'bg-indigo-600'
              : 'bg-gray-100'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isDisabled
                ? 'text-gray-400'
                : isSelected
                ? 'text-white'
                : 'text-gray-600'
            }`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-semibold ${
                isDisabled
                  ? 'text-gray-500 line-through'
                  : isSelected
                  ? 'text-indigo-900'
                  : 'text-gray-900'
              }`}
            >
              {name}
            </h3>
            {isDisabled && (
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                {comingSoonText}
              </span>
            )}
          </div>
          <p
            className={`text-sm ${
              isDisabled ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        </div>
        {isSelected && !isDisabled && (
          <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        )}
      </div>
    </button>
  );
};

export default PaymentMethodCard;

