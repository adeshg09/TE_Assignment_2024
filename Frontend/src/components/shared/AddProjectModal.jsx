import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect } from "react-multi-select-component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProjectContext } from '../../context/projectContext';
import { noOfMembers, skillSetOptions } from '../../constants/data';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const schema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  description: Yup.string().required('Project Description is required'),
  skillSet: Yup.array().min(1, 'At least one skill is required'),
  noOfMembers: Yup.string().required('Number of Members is required'),
});

export default function AddProjectModal({ isOpen, onClose }) {
  const { addProject } = useProjectContext();
  
 
  const { control, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      skillSet: [],
      noOfMembers: '',
      isActive: false,
    },
  });


  useEffect(() => {
    if (!isOpen) {
      reset(); 
    }
  }, [isOpen, reset]);

  const skillSetOptionsFormatted = skillSetOptions.map(skill => ({ label: skill, value: skill }));

 
  const onSubmit = (data) => {
    addProject({
      ...data,
      createdAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="font-bold">Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  placeholder="Project Name"
                  id="name"
                  {...field}
                />
              )}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  placeholder="Project Description"
                  id="description"
                  {...field}
                />
              )}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="skillSet">Skillset</Label>
            <Controller
              control={control}
              name="skillSet"
              render={({ field }) => (
                <MultiSelect
                  options={skillSetOptionsFormatted}
                  value={skillSetOptionsFormatted.filter(option => field.value.includes(option.value))}
                  onChange={(selected) => {
                    field.onChange(selected.map(option => option.value));
                    setValue('skillSet', selected.map(option => option.value)); 
                    trigger('skillSet');
                  }}
                  labelledBy="Select Skills"
                />
              )}
            />
            {errors.skillSet && <p className="text-red-500">{errors.skillSet.message}</p>}
          </div>
          <div>
            <Label htmlFor="noOfMembers">Number of Members</Label>
            <Controller
              control={control}
              name="noOfMembers"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of members" />
                  </SelectTrigger>
                  <SelectContent>
                    {noOfMembers.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.noOfMembers && <p className="text-red-500">{errors.noOfMembers.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Checkbox
                  id="isActive"
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="isActive">Is Active?</Label>
          </div>
          <DialogFooter>
            <Button type="submit">Add Project</Button>
            <Button type="button" onClick={onClose}>Back</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
