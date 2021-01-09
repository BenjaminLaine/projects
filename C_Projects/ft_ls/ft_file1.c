/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_file1.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/18 02:59:57 by blaine            #+#    #+#             */
/*   Updated: 2020/06/18 00:29:35 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_lst_file(t_file **alst, t_file *newblock)
{
	t_file	*move;

	if (newblock)
	{
		if (!(*alst))
		{
			(*alst) = newblock;
			return ;
		}
		move = (*alst);
		while (move->next)
			move = move->next;
		move->next = newblock;
	}
}

void	ft_get_perm(t_file **filep)
{
	t_file *file;

	ft_file_type(filep);
	file = *filep;
	file->data->perm[1] = (file->data->stats.st_mode & S_IRUSR) ? 'r' : '-';
	file->data->perm[2] = (file->data->stats.st_mode & S_IWUSR) ? 'w' : '-';
	if (file->data->stats.st_mode & S_IXUSR)
		file->data->perm[3] = (file->data->stats.st_mode & S_ISUID) ? 's' : 'x';
	else
		file->data->perm[3] = (file->data->stats.st_mode & S_ISUID) ? 'S' : '-';
	file->data->perm[4] = (file->data->stats.st_mode & S_IRGRP) ? 'r' : '-';
	file->data->perm[5] = (file->data->stats.st_mode & S_IWGRP) ? 'w' : '-';
	if (file->data->stats.st_mode & S_IXGRP)
		file->data->perm[6] = (file->data->stats.st_mode & S_ISGID) ? 's' : 'x';
	else
		file->data->perm[6] = (file->data->stats.st_mode & S_ISGID) ? 'S' : '-';
	file->data->perm[7] = (file->data->stats.st_mode & S_IROTH) ? 'r' : '-';
	file->data->perm[8] = (file->data->stats.st_mode & S_IWOTH) ? 'w' : '-';
	if (file->data->stats.st_mode & S_IXOTH)
		file->data->perm[9] = (file->data->stats.st_mode & S_ISVTX) ? 't' : 'x';
	else
		file->data->perm[9] = (file->data->stats.st_mode & S_ISVTX) ? 'T' : '-';
	file->data->perm[10] = '\0';
}

void	opt_l(t_file **file, t_max *max)
{
	char *tmp;

	ft_get_perm(file);
	ft_get_user(file);
	ft_get_date(file);
	(*file)->data->link = (*file)->data->perm[0] == 'l' ? 1
		: (int)(*file)->data->stats.st_nlink;
	(*file)->data->size = (*file)->data->stats.st_size;
	if ((*max).group < (int)ft_strlen((*file)->data->group))
		(*max).group = ft_strlen((*file)->data->group);
	if ((*max).user < (int)ft_strlen((*file)->data->user))
		(*max).user = ft_strlen((*file)->data->user);
	tmp = ft_itoa((*file)->data->size);
	if ((*max).size < (int)ft_strlen(tmp))
		(*max).size = ft_strlen(tmp);
	ft_strdel(&tmp);
	tmp = ft_itoa((*file)->data->link);
	if ((*max).links < (int)ft_strlen(tmp))
		(*max).links = ft_strlen(tmp);
	ft_strdel(&tmp);
}

t_file	*ft_new_file(t_opt *opt, char *name, t_max *max)
{
	t_file			*file;
	struct stat		buf;

	if (!(file = malloc(sizeof(t_file))))
		ft_printf("%s\n", strerror(errno));
	if (!(file->data = malloc(sizeof(t_data))))
		ft_printf("%s\n", strerror(errno));
	file->data->name = ft_name(name);
	if ((*max).name < (int)ft_strlen(file->data->name))
		(*max).name = ft_strlen(file->data->name);
	if (!(file->data->path = ft_strdup(name)))
		ft_printf("%s\n", strerror(errno));
	file->next = NULL;
	if (opt->l || opt->t)
	{
		lstat(name, &buf);
		file->data->stats = buf;
	}
	if (opt->l)
	{
		(*max).total += buf.st_blocks;
		opt_l(&file, max);
	}
	return (file);
}

char	*ft_name(char *path)
{
	int i;

	i = 0;
	while (path[i])
		i++;
	while (path[i] != '/' && i >= 0)
		i--;
	return (ft_strdup(path + i + 1));
}
