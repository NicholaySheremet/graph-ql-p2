import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../mutations/projectsMutations';
import { GET_PROJECTS } from '../queries/projectQueries';


export default function ProjectRow({ project }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project?.id },
    update(cache, { data: { deleteProject } }) {
      const { projects = [] } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter((project) => {
          return project?.id !== deleteProject?.id;
        }) }
      })
    }
  });

  return (
    <tr>
      <td>{ project?.name || '' }</td>
      <td>{ project?.description || '' }</td>
      <td>{ project?.status || '' }</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={deleteProject}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}
