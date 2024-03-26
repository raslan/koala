'use client';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '@/store/settings';

const CalculatorSettingsForm = () => {
  const { notation, updateState } = useSettingsStore();
  return (
    <div>
      <h3 className='text-sm font-medium my-2'>Calculator Settings</h3>
      <p className='text-sm text-muted-foreground my-2'>
        Modify different parts of the calculator behavior
      </p>
      <div className='inline-flex items-center scale-90 -ml-5'>
        <Switch
          className='mr-1'
          checked={notation === 'compact'}
          onCheckedChange={(checked) =>
            updateState((state) => {
              state.notation = checked ? 'compact' : 'standard';
            })
          }
        />
        Compact Mode (e.g. $58k instead of $58,123.4)
      </div>
    </div>
  );
};
export default CalculatorSettingsForm;
