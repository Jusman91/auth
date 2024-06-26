import { ControllerFields } from '@/components/atoms';
import { useFormContext } from '@/hooks';
import { isFieldHidden } from '@/lib/utils';
import { getFieldsAuthFormData } from '@/lib/utils/auth';

const AuthFields = () => {
	const { name } = useFormContext();
	const { fieldItems } = getFieldsAuthFormData(name);

	return fieldItems.map((field) =>
		isFieldHidden({
			fieldName: field.name,
			formName: name,
		}) ? null : (
			<ControllerFields key={field.name} {...field} />
		),
	);
};

export default AuthFields;
